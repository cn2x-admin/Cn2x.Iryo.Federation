@echo off
echo Concedendo permissoes para a service account...

gcloud projects add-iam-policy-binding cn2x-iryo-471112 ^
  --member="serviceAccount:cn2x-github-action@cn2x-iryo-471112.iam.gserviceaccount.com" ^
  --role="roles/editor"

echo.
echo Permissoes concedidas com sucesso!
echo Agora o pipeline do GitHub Actions deve funcionar.
pause