package message.config;

import message.bean.Message;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.kafka.listener.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class ConsumerContainerFactory implements MessageListener<String, Message> {
    @Autowired
    private SimpMessagingTemplate messageTemplate;
    private String subscribe;

    @Override
    public void onMessage(ConsumerRecord<String, Message> data) {
        messageTemplate.convertAndSend(subscribe, data.value());
    }

    public ConcurrentMessageListenerContainer<String, Message> createContainer(
            ConcurrentKafkaListenerContainerFactory<String, Message> factory, String consumerGroupId) {

        this.subscribe="/subscribe/"+consumerGroupId;
        String topic = consumerGroupId.split("-")[0];
        ConcurrentMessageListenerContainer<String, Message> container = factory.createContainer(topic);
        container.getContainerProperties().setMessageListener(this);
        container.getContainerProperties().setGroupId(consumerGroupId);
        container.setBeanName(consumerGroupId);
        container.start();
        return container;
    }
}
