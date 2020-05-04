gcloud config set project mon-metier-a-tisser
echo Y | gcloud beta app deploy app-prod-back.yaml
gcloud app browse -s prod-back
gcloud app logs tail -s prod-back
