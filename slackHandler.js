const axios = require("axios");

axios.get('https://gitlab.com/api/v4/projects/21312786/pipelines', {headers: {"PRIVATE-TOKEN": "cd9YeBvBJB2TZTptBziY"}})
    .then(({data}) => {
        const lastPipeline = data[0];
        axios.get(`https://gitlab.com/api/v4/projects/21312786/pipelines/${lastPipeline.id}/jobs`, {headers: {"PRIVATE-TOKEN": "cd9YeBvBJB2TZTptBziY"}})
            .then(({data}) => {
                const deployJob = data.filter(job => job.stage === "deploy")[0];
                axios.post(
                    'https://hooks.slack.com/services/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',
                    getFormattedSlackNotification(lastPipeline, deployJob),
                    {headers : { 'Content-type' : 'application/json' }}
                    )
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            })
    });

function getFormattedSlackNotification(pipeline, deployJob) {

    const emoji = function (status) {
        if(status === "success") return ':heavy_check_mark:';
        else return ':x:'
    };

    const env = pipeline.ref === "master" ? "Beta" : "Prod";

    return `
        {
          "attachments": [
            {
              "blocks": [
                {
                  "type": "section",
                  "fields": [
                    {
                      "type": "mrkdwn",
                      "text": "*Env:*\n\`${env}\`"
                    },
                    {
                      "type": "mrkdwn",
                      "text": "*Pipeline*\n<${pipeline.web_url}|#${pipeline.id}>"
                    },
                    {
                      "type": "mrkdwn",
                      "text": "*Deploy:*\n${emoji(deployJob.status)} \`${deployJob.status}\`"
                    }
                  ]
                },
                {
                  "type": "actions",
                  "elements": [
                    {
                      "type": "button",
                      "text": {
                        "type": "plain_text",
                        "emoji": true,
                        "text": "${pipeline.ref === "master" ? "Admin-app beta" : "Admin-app prod"}"
                      },
                      "style": "primary",
                      "url": "${pipeline.ref === "master" ? "https://benfree-admin-ui-beta.netlify.app" : "https://benfree-admin-ui-prod.netlify.app"}",
                      "action_id": "button-action"
                    }
                  ]
                }
              ]
            }
          ]
        }
    `;
}
