import praw
from praw.models import MoreComments
import re

print('Connecting to Reddit API...')
# Reddit API script app authentication via OAuth2
reddit = praw.Reddit(client_id='JMZJN7O4xdJshg',
                     client_secret='HebwFByjZ8XA2F9_IsEp7f1x1-0',
                     user_agent='Comment Extraction /u/430_GroupProject)',
                     username='430_GroupProject',
                     password='info430')
print('Done connecting.')

# Store Reddit submission ids in a list for easy iteration
submission_ids = ['cylp5r', 'bw7sr3', 'ax496f', 'a2mafb', '9cjd6n', '8ofct2', '82469b', '7hfrba', '6xytuu', '6fco6u']

# Store all comments from each Reddit submission into one collective list
print('Processing Reddit submissions... (~1-2 minutes)')
all_comments = []
for item in submission_ids:
    submission = reddit.submission(id=item)
    submission.comments.replace_more(limit=None)
    for comment in submission.comments.list():
        all_comments.append(comment.body)
    print('...')
print(f'Done processing. Collected {len(all_comments)} comments.')

# Save raw data to a text file
with open('output/data.txt', 'w') as file:
    for item in all_comments:
        file.write('%s\n' % item)
print('Initial data written out to file \'output/data.txt\'.')

# Clean up comments list, keep only relevant items
# Using regular expressions to test items for relevance, search items for all the following keywords: 
    # Company/Industry
    # Title 
    # Salary
    # Relocation/Housing Stipend
print('Cleaning and extracting entries from data...')
regexps = ['^[\s\S]*\\bCompany/Industry\\b[\s\S]*$', '^[\s\S]*\\bTitle\\b[\s\S]*$',
 '^[\s\S]*\\bSalary\\b[\s\S]*$', '^[\s\S]*\\bRelocation/Housing Stipend\\b[\s\S]*$']
relevant_comments = []
for item in all_comments:
    remove = False
    for regex in regexps:
        match_obj = re.search(regex, item)
        if match_obj is None:
            remove = True
            break
    if not remove:
        relevant_comments.append(item)
print(f'...{len(relevant_comments)} relevant comments found...')

# Take list of relevant comments and extract entries, then clean up and validate each entry
# Store cleaned/validated entries into a dictionary
# Created a list of valid companies using:
    # with open('companies.txt') as file:
    #     valid_companies = [line.strip() for line in file]
    #     print(valid_companies)
valid_companies = ['ADP', 'Affirm', 'Airbnb', 'Akuna Capital', 'Allstate', 'Amazon', 'American Express', 'Appian', 'Apple', 'Arconic', 'AT&T', 'Atlassian', 'AWS', 'Bank of America', 'Barclays', 'Bloomberg', 'BNY Mellon', 'Boeing', 'Box', 'Capital One', 'CenturyLink', 'Chan Zuckerberg Initiative', 'Chevron', 'Cisco', 'Citadel', 'Citi Group', 'Coinbase', 'Comcast', 'ConocoPhillips', 'Convoy', 'Coursera', 'Credit Karma', 'CSIRO', 'Datadog', 'Digital Ocean', 'Disney', 'DoD', 'E&Y', 'EA', 'Ernst & Young', 'ExxonMobil', 'Facebook', 'FB', 'Fidelity', 'Foursquare', 'GitHub', 'GoDaddy', 'Goldman Sachs', 'Google', 'Groupon', 'Home Depot', 'HomeAway', 'Honda R&D', 'Honeywell', 'IBM', 'Intel', 'Intuit', 'J.P. Morgan', 'JP Morgan', 'JP Morgan Chase', 'JPM', 'JPMorgan', 'JPMorgan Chase', "Kohl's", 'Leidos', 'Liberty Mutual Insurance', 'Linkedin', 'Lockheed Martin', 'Lyft', 'Microsoft', 'Microstrategy', 'MongoDB', 'NASA', 'NCR', 'Nextdoor', 'Nike', 'Nordstrom', 'Nubank', 'NVIDIA', 'OpenTable', 'PagerDuty', 'PayPal', 'Prudential Financial', 'Pure Storage', 'Qualcomm', 'Qualtrics', 'Quora', 'Raytheon', 'Redfin', 'Riot Games', 'Rockwell Collins', 'Rubrik', 'Salesforce', 'SAP', 'Shift', 'Shopify', 'Slack', 'Snap Inc.', 'Square', 'Squarespace', 'Stripe', 'SurveyMonkey', 'Tableau', 'Tesla', 'The Walt Disney Studios', 'TripAdvisor', 'Twitch', 'Twitter', 'Uber', 'Ubisoft', 'UPS', 'USAA', 'Vanguard', 'Verizon', 'ViaSat', 'Visa', 'VMware', 'Wayfair', 'Western Digital', 'Willowtree Inc.', 'Workday', 'Yahoo', 'Yelp', 'Yext', 'Zillow']
entries = {
    'company': [],
    'position': [],
    'salary': [],
    'stipend': []
}
for item in relevant_comments:
    # Extract only relevant lines from comment
    companies = re.findall('.*Company/Industry:.*', item)
    positions = re.findall('.*Title:.*', item) 
    salaries = re.findall('.*Salary:.*', item) 
    stipends = re.findall('.*Relocation/Housing Stipend:.*', item) 

    # Check that extracted entries are complete with Company, Position, Salary, and Stipend
    if len(companies) == len(positions) and len(positions) == len(salaries) and len(salaries) == len(stipends):
        # Clean up extracted entries
        for i in range(len(companies)):
            company = re.split(':', companies[i])
            position = re.split(':', positions[i])
            salary = re.split(':', salaries[i])
            stipend = re.split(':', stipends[i])
            company[1] = company[1].strip()
            position[1] = position[1].strip()
            salary[1] = salary[1].strip()
            stipend[1] = stipend[1].strip()
            if company[1].startswith('*'):
                temp = company[1]
                company[1] = temp[2:]
            if company[1].endswith('*'):
                temp = company[1]
                company[1] = temp[:-2]
            if position[1].startswith('*'):
                temp = position[1]
                position[1] = temp[2:]
            if position[1].endswith('*'):
                temp = position[1]
                position[1] = temp[:-2]
            if salary[1].startswith('*'):
                temp = salary[1]
                salary[1] = temp[2:]
            if salary[1].endswith('*'):
                temp = salary[1]
                salary[1] = temp[:-2]
            if salary[1].startswith('\\'):
                temp = salary[1]
                salary[1] = temp[1:]
            if salary[1].startswith('~'):
                temp = salary[1]
                salary[1] = temp[1:]
            if '£' in salary[1] or '€' in salary[1] or 'Euro' in salary[1] or 'euro' in salary[1] or 'yen' in salary[1] or 'CAD' in salary[1]:
                continue
            if stipend[1].startswith('*'):
                temp = stipend[1]
                stipend[1] = temp[2:]
            if stipend[1].endswith('*'):
                temp = stipend[1]
                stipend[1] = temp[:-2]
            company[1] = company[1].strip()
            position[1] = position[1].strip()
            salary[1] = salary[1].strip()
            stipend[1] = stipend[1].strip()

            # Check if company is contained in the list of valid companies
            if company[1] not in valid_companies:
                continue

            # Validate/convert salary to hourly rate
            salary_number = re.findall('\d+\.\d+|\d+', salary[1])
            if len(salary_number) is 0:
                continue
            salary_number = float(salary_number[0])
            if salary_number > 5 and salary_number < 10:
                salary_number = salary_number * 1000
            if salary_number > 1000:
                salary_number = salary_number / 160
            if salary_number < 10 or salary_number > 100:
                continue
            salary_number = int(round(salary_number))

            # Validate stipend
            if len(stipend[1]) > 58:
                continue

            # Store entry into a dictionary
            entries.get('company').append(company[1])
            entries.get('position').append(position[1])
            entries.get('salary').append(salary_number)
            entries.get('stipend').append(stipend[1])

# Save extracted entries to a text file
with open('output/entries.txt', 'w') as file:
    companies = entries.get('company')
    positions = entries.get('position')
    salaries = entries.get('salary')
    stipends = entries.get('stipend')
    for i in range(len(companies)):
        file.write('%s|%s|%s|%s\n' % (companies[i], positions[i], salaries[i], stipends[i]))
        # file.write('%s\n' % positions[i])
        # file.write('%s\n' % salaries[i])
        # file.write('%s\n' % stipends[i])
        # file.write('\n')
print(f'{len(companies)} valid entries extracted from comments.')
print('Entries are written out to file \'output/entries.txt\'.')
