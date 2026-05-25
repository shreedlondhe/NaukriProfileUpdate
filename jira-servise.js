require('dotenv').config();
const axios = require('axios');

const jira = axios.create({
  baseURL: 'https://**YOUR_JIRA_DOMAIN**.atlassian.net',
  auth: {
    username: "**JIRA_EMAIL**",
    password: "**JIRA_API_TOKEN**"
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// Convert Jira ADF format to readable text
function extractText(content) {

  let text = '';

  if (!content) return text;

  for (const item of content) {

    // Paragraphs
    if (item.type === 'paragraph' && item.content) {

      item.content.forEach(c => {
        if (c.text) {
          text += c.text;
        }
      });

      text += '\n';
    }

    // Bullet Lists
    if (item.type === 'bulletList') {

      item.content.forEach(li => {

        li.content.forEach(p => {

          p.content?.forEach(c => {

            if (c.text) {
              text += `• ${c.text}\n`;
            }

          });

        });

      });
    }
  }

  return text;
}

// Fetch Jira Ticket
async function getJiraTicket(ticketId) {

  try {

    const response = await jira.get(
      `/rest/api/3/issue/${ticketId}`
    );

    const issue = response.data;

    console.log('\n====================================');
    console.log('JIRA TICKET DETAILS');
    console.log('====================================');

    console.log('\nTicket ID:');
    console.log(ticketId);

    console.log('\nSummary:');
    console.log(issue.fields.summary);

    console.log('\nStatus:');
    console.log(issue.fields.status.name);

    console.log('\nPriority:');
    console.log(issue.fields.priority?.name);

    console.log('\nDescription:\n');

    const description = extractText(
      issue.fields.description?.content
    );

    console.log(description);

    return {
      summary: issue.fields.summary,
      description,
      status: issue.fields.status.name
    };

  } catch (error) {

    console.log('\nERROR OCCURRED');
    console.log('Status:', error.response?.status);

    console.log(
      'Message:',
      error.response?.data || error.message
    );
  }
}

getJiraTicket('TURTLE-6');