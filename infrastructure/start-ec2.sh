#!/bin/bash
# Script para iniciar la instancia EC2

INSTANCE_ID="i-0cd0114cc380647a9"

echo "Iniciando instancia EC2: $INSTANCE_ID"
aws ec2 start-instances --instance-ids $INSTANCE_ID

echo "Esperando que la instancia esté corriendo..."
aws ec2 wait instance-running --instance-ids $INSTANCE_ID

PUBLIC_IP=$(aws ec2 describe-instances \
    --instance-ids $INSTANCE_ID \
    --query 'Reservations[0].Instances[0].PublicIpAddress' \
    --output text)

echo "✅ Instancia iniciada"
echo "Nueva IP pública: $PUBLIC_IP"
echo "Acceso SSH: ssh -i TaskCloud-Key.pem ec2-user@$PUBLIC_IP"
echo "Acceso Web: http://$PUBLIC_IP"
