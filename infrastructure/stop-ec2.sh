#!/bin/bash
# Script para detener la instancia EC2 y ahorrar costos

INSTANCE_ID="i-0cd0114cc380647a9"

echo "Deteniendo instancia EC2: $INSTANCE_ID"
aws ec2 stop-instances --instance-ids $INSTANCE_ID

echo "✅ Instancia detenida. Costo: \$0/hora"
echo "Para iniciarla nuevamente, ejecuta: ./start-ec2.sh"
