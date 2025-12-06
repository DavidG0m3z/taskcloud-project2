# Scripts de Control de Instancia EC2

## Descripción
Scripts para gestionar el ciclo de vida de la instancia EC2 del proyecto TaskCloud.

## Archivos

### stop-ec2.sh
Detiene la instancia EC2 para ahorrar costos cuando no se está utilizando.

**Uso:**
```bash
./stop-ec2.sh
```

**Ahorro de costos:**
- Con instancia detenida: ~$0.80/mes (solo almacenamiento EBS)
- Con instancia corriendo 24/7: ~$8.50/mes

### start-ec2.sh
Inicia la instancia EC2 cuando se necesita usar.

**Uso:**
```bash
./start-ec2.sh
```

**Nota:** La IP pública cambiará cada vez que inicies la instancia.

## Información de la Instancia

- **Instance ID:** i-0cd0114cc380647a9
- **Instance Type:** t2.micro
- **Region:** us-east-1
- **VPC:** vpc-0455ce8f089b568b1
- **Subnet:** subnet-053c0ca16f137dd97
- **Security Group:** sg-0035db8ea5a6ed224

## Buenas Prácticas

1. **Detén la instancia** cuando no la estés usando activamente
2. **Monitorea los costos** en AWS Cost Explorer
3. **Establece alertas** de facturación en AWS Budgets
4. **Revisa los logs** de CloudWatch antes de detener

## Conexión SSH

Cuando la instancia esté corriendo:
```bash
ssh -i TaskCloud-Key.pem ec2-user@<PUBLIC_IP>
```

## Verificar Estado
```bash
aws ec2 describe-instances \
    --instance-ids i-0cd0114cc380647a9 \
    --query 'Reservations[0].Instances[0].State.Name' \
    --output text
```

Estados posibles:
- `running`: Instancia activa (cobrando)
- `stopped`: Instancia detenida (sin cobro de cómputo)
- `stopping`: Deteniéndose
- `pending`: Iniciándose
