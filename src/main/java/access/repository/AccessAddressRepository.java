package access.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.Address;

public interface AccessAddressRepository extends JpaRepository<Address, Long> {

}
