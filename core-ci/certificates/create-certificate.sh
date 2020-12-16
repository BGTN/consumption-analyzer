openssl req -x509 -newkey rsa:4096 -keyout private.key -out certificate.crt -days 365
openssl pkcs12 -export -out certificate.pfx -inkey private.key -in certificate.crt
openssl x509 -inform pem -in certificate.crt -outform der -out mycerts.cer