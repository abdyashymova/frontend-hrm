#!/bin/sh

ssh -o StrictHostKeyChecking=no -i $ID_RSA $SERVER_USER@$SERVER_IP <<'ENDSSH'
  cd frontend
  docker pull registry.megacom.local/hrm/frontend:latest
  docker stop hrm-front || true && docker rm hrm-front || true
  docker run -p 3000:80 -d --name hrm-front registry.megacom.local/hrm/frontend:latest
ENDSSH
