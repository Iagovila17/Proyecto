package com.tienda.I.tek.DTO;

import java.util.Date;

public class CheckoutRequest {

    private String direccionEnvio;
    private String metodoPago; 
    private Double total;
    private Date fecha;
   
    public CheckoutRequest() {
    }

    public CheckoutRequest( String direccionEnvio, String metodoPago, Double total, Date fecha) {
        this.direccionEnvio = direccionEnvio;
        this.metodoPago = metodoPago;
        this.total = total;
        this.fecha = fecha;
    }



    public String getDireccionEnvio() {
        return direccionEnvio;
    }

    public void setDireccionEnvio(String direccionEnvio) {
        this.direccionEnvio = direccionEnvio;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    @Override
    public String toString() {
        return "CheckoutRequest [ direccionEnvio=" + direccionEnvio + ", metodoPago=" + metodoPago
                + ", total=" + total + ", fecha=" + fecha + "]";
    }

    

}
