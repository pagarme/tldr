FROM pagarme/yopa:latest

COPY yopa-config.yml /tmp/yopa-in/config.yml

EXPOSE 47195

CMD ["sh","-c","/usr/bin/java -Xms64m -Xmx256m -jar uberjar.jar -c /tmp/yopa-in/config.yml -o /tmp/dev-env-aws-regions-override.xml"]
