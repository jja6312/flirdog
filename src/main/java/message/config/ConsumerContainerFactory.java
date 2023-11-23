package message.config;

import message.bean.Message;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.kafka.listener.MessageListener;
import org.springframework.stereotype.Component;

@Component
public class ConsumerContainerFactory implements MessageListener<String, Message> {
    @Override
    public void onMessage(ConsumerRecord<String, Message> data) {
            System.out.println("Received message: " + data.value());
    }

    public ConcurrentMessageListenerContainer<String, Message> createContainer(
            ConcurrentKafkaListenerContainerFactory<String, Message> factory, String topic, String group) {

        ConcurrentMessageListenerContainer<String, Message> container = factory.createContainer(topic);
        container.getContainerProperties().setMessageListener(this);
        container.getContainerProperties().setGroupId(group);
        container.setBeanName(group);
        container.start();
        return container;
    }
}