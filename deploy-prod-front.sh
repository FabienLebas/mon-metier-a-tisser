source .env.production
yarn build
gcloud config set project mon-metier-a-tisser
echo Y | gcloud app deploy app-prod-front.yaml
gcloud app browse -s default
# bash test-prod.sh
