package ar.edu.um.fincaspp.webgw;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("ar.edu.um.fincaspp.webgw");

        noClasses()
            .that()
                .resideInAnyPackage("ar.edu.um.fincaspp.webgw.service..")
            .or()
                .resideInAnyPackage("ar.edu.um.fincaspp.webgw.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..ar.edu.um.fincaspp.webgw.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
