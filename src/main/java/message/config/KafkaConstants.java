package message.config;

import java.util.List;
import java.util.UUID;

public class KafkaConstants {
    private static String name = UUID.randomUUID().toString();
    public static final String KAFKA_TOPIC = "message";
    public static final String GROUP_ID = name;
    public static final String KAFKA_BROKER = "223.130.146.216:9092,223.130.146.210:9092,223.130.146.187:9092";
    public static List<Integer> partitionList;
}