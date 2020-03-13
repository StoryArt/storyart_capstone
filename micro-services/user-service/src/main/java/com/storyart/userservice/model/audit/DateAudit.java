package com.storyart.userservice.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.time.Instant;



@MappedSuperclass
/* to allow an entity to inherit properties from a base class.
Unlike the @Inheritance annotation which maps the Java Object
inheritance to a relational database model which emulates inheritance,
@MappedSuperclass only models inheritance in the OOP world.
From a database perspective, the @MappedSuperclass inheritance model
is invisible since all the base class properties are simply
 copied to the database table mapped by the actual entity class
 https://vladmihalcea.com/how-to-inherit-properties-from-a-base-class-entity-using-mappedsuperclass-with-jpa-and-hibernate/*/


@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(
        value = {"createdAt", "updatedAt"},
        allowGetters = true
)

/*To enable JPA Auditing, we’ll need to add
@EnableJpaAuditing annotation to our main class or any other configuration classes*/

/* DateAudit reference  :https://www.baeldung.com/database-auditing-jpa*/
@Getter
@Setter
public abstract class DateAudit implements Serializable {

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private Instant updatedAt;


}
