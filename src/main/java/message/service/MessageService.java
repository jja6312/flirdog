package message.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import message.bean.Message;
import message.config.ConsumerContainerFactory;
import message.config.KafkaConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageService {
    @Autowired
    private KafkaTemplate<String, Message> kafkaTemplate;
    @Autowired
    private ConsumerContainerFactory consumerContainerFactory;
    @Autowired
    private ConcurrentKafkaListenerContainerFactory<String, Message> kafkaListenerContainerFactory;

    public void send(String topic, Message message) {
        message = message.setSendDateToCurrentTime();
            System.out.println(message);
        try {
            kafkaTemplate.send(topic, message).get(3, TimeUnit.SECONDS);
        } catch (ExecutionException e) {
            System.out.println(e);
        } catch (TimeoutException | InterruptedException e) {
            System.out.println(e);
        }
    }

    public void listen(String consumerGroupId) {
        consumerContainerFactory.createContainer(kafkaListenerContainerFactory, consumerGroupId);
    }
}
