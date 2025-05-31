package com.tienda.I.tek.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tienda.I.tek.Entities.Product;
import com.tienda.I.tek.Enumerated.Categoria;

public interface ProductRepository extends JpaRepository<Product, Long>{
List<Product> findByCategoria(Categoria categoria);
List<Product> findByCategoriaAndFamilia(Categoria categoria, String familia);
List<Product> findByNombreContainingIgnoreCaseOrReferenciaContainingIgnoreCase(String nombre, String referencia);

    @Query("SELECT p FROM Product p WHERE " +
           "(LOWER(p.nombre) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(p.referencia) LIKE LOWER(CONCAT('%', :query, '%'))) " +
           "AND p.categoria = :categoria")
    List<Product> buscarPorNombreReferenciaYCategoria(@Param("query") String query, @Param("categoria") String categoria);

    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.nombre) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(p.referencia) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> buscarPorNombreOReferencia(@Param("query") String query);

    @Query("SELECT p FROM Product p WHERE (LOWER(p.nombre) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.referencia) LIKE LOWER(CONCAT('%', :query, '%'))) AND p.categoria = :categoria")
    List<Product> findByNombreOrReferenciaAndCategoria(@Param("query") String query, @Param("categoria") Categoria categoria);
}
