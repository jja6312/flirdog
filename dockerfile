FROM showg100/jdkwithssl:1.0

# Kafka 바이너리를 이미지로 복사합니다. (이 예제에서는 /app/kafka 디렉토리에 Kafka가 설치되었다고 가정합니다.)
COPY build/libs/flirdog-0.0.1-SNAPSHOT.jar /app/flirdog-0.0.1-SNAPSHOT.jar

# 실행 명령어를 설정합니다. host 환경 변수를 사용하여 동적으로 설정합니다.
CMD ["java", "-jar", "/app/flirdog-0.0.1-SNAPSHOT.jar"]
