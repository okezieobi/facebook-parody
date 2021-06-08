# Facebook parody

[![Node.js CI](https://github.com/okezieobi/facebook-parody/actions/workflows/node.js.yml/badge.svg)](https://github.com/okezieobi/facebook-parody/actions/workflows/node.js.yml)

[![codacy-coverage-reporter](https://github.com/okezieobi/facebook-parody/actions/workflows/codacy-coverage-reporter.yml/badge.svg)](https://github.com/okezieobi/facebook-parody/actions/workflows/codacy-coverage-reporter.yml)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/83a4dfaccd1042a89c6e44e7eae8b558)](https://www.codacy.com/gh/okezieobi/facebook-parody/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=okezieobi/facebook-parody&amp;utm_campaign=Badge_Grade)

[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/83a4dfaccd1042a89c6e44e7eae8b558)](https://www.codacy.com/gh/okezieobi/facebook-parody/dashboard?utm_source=github.com&utm_medium=referral&utm_content=okezieobi/facebook-parody&utm_campaign=Badge_Coverage)

[![Coveralls GitHub Action](https://github.com/okezieobi/facebook-parody/actions/workflows/coveralls.yml/badge.svg)](https://github.com/okezieobi/facebook-parody/actions/workflows/coveralls.yml)

[![Coverage Status](https://coveralls.io/repos/github/okezieobi/facebook-parody/badge.svg?branch=main)](https://coveralls.io/github/okezieobi/facebook-parody?branch=main)

## Stack

ExpressJS/NodeJS, MongoDB/Mongoose, Jest

## Installation instructions

- Install Node (preferably lts version) and MongoDB
- Clone repo and create an .env file in repo root with the following secrets: TEST_DATABASE_URL, DEV_DATABASE_URL, JWT_SECRET. TEST_DATABASE_URL and DEV_DATABASE_URL should obviously be MongoDB connection strings in the format of "mongodb://localhost/your-database-name", JWT_SECRET can be any value
- Open repo at root location in terminal/command line and run 'npm i' to install project dependencies
- Run 'npm run dev' to start app in development mode or 'npm build' then 'npm start' to start app in production/staging mode
- Navigate to <http://localhost:5000> to view and use Swagger documentation of app
