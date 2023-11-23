package message.config;

import com.google.common.collect.ImmutableMap;
import lombok.extern.slf4j.Slf4j;
import message.bean.Message;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.Map;

@EnableKafka
@Configuration
@Slf4j
public class ConsumerConfiguration {

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Message> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, Message> kafkaListenerContainerFactory = new ConcurrentKafkaListenerContainerFactory<>();
        kafkaListenerContainerFactory.setConsumerFactory(consumerFactory());
        return kafkaListenerContainerFactory;
    }

    private JsonDeserializer<Message> getAllTrustJsonDeserializer() {
        JsonDeserializer<Message> allTrustJsonDeserializer = new JsonDeserializer<>();
        allTrustJsonDeserializer.addTrustedPackages("*");
        return allTrustJsonDeserializer;
    }

    private Map<String, Object> consumerConfigurations() {
        Map<String, Object> consumerConfigurations =
                ImmutableMap.<String, Object>builder()
                    .put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, KafkaConstants.KAFKA_BROKER)
                    .put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class)
                    .put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, getAllTrustJsonDeserializer())
                    .put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest")
                    .build();
        return consumerConfigurations;
    }

    private ConsumerFactory<String, Message> consumerFactory() {
        return new DefaultKafkaConsumerFactory<>(consumerConfigurations(), new StringDeserializer(), getAllTrustJsonDeserializer());
    }

}