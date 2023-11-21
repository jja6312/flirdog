package mypage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mypage.repository.MypageRepository;
import user.bean.User;

@Service
public class MypageServiceImpl implements MypageService {
    @Autowired
    private MypageRepository mypageRepository;

    @Override
    public User getUserProfile(Long userId) {
        return mypageRepository.findById(userId).orElse(null);
    }
}
