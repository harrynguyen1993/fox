# fox

## Step 1: Create a New Project Folder (if not already created)
```
mkdir cypress-project
cd cypress-project
```
## Step 2: Initialize a New Node.js Project (if not already done)
``npm init -y``
##  Step 3: Install Cypress
```npm install cypress --save-dev```
## Step 4: Open Cypress for the First Time (This creates the cypress folder and configuration file)
```npx cypress open
npx cypress run```
##  Step 5: Project Structure
```After running Cypress, you’ll see a folder structure like this:
/cypress
  /e2e
  /fixtures
  /support
cypress.config.js  (Configuration file)```