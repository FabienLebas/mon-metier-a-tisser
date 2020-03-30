source .env.production
yarn build
echo Y | gcloud app deploy app-prod-front.yaml
gcloud app browse -s default
# bash test-prod.sh
