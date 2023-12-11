package admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.Address;

public interface AdminAddressRepository extends JpaRepository<Address, Long>{

	Address findByUserId(Long id);

}
