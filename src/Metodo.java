package Main;

import javax.swing.*;
import java.awt.*;
import java.util.Random;

public class Metodo {
    private final Random RD = new Random();
    private  int ganaPlayer = 0;
    private int ganaComputer=0;
    public int turnoMaquina(){
        return RD.nextInt(2);
    }
    public String versus(int valorUsuario, int valorMaquina){
        if (valorMaquina == valorUsuario){
            return "Empate";
        }else{
            switch (valorMaquina){
                case 0: {
                    if (valorUsuario == 1){
                        return "Win Player";
                    }
                }
                break;
                case 1:{
                    if (valorUsuario == 2){
                        return "Win Player";
                    }
                }
                break;
                case 2: {
                    if (valorUsuario == 0){
                        return "Win Player";
                    }
                }
                break;
            }
        }
        return "Win Computer";
    }
    public ImageIcon traductorTurnero(int val){
        String resImg = "";
        switch (val){
            case 0: {
                resImg = "/Image/papel(2).png";
            }
            break;
            case 1: {
                resImg = "/Image/papel(1).png";
            }
            break;
            case 2: {
                resImg = "/Image/tijera.png";
            }
            break;
        }
        ImageIcon imgCon = new ImageIcon(getClass().getResource(resImg));
        ImageIcon imgJlb = new ImageIcon(imgCon.getImage());
        return imgJlb;
    }
    public void contador_de_Victorias(String valor){
        switch (valor){
            case "Win Player":{
                ganaPlayer++;
            }
            break;
            case "Win Computer":{
                ganaComputer++;
            }
        }
    }
    public int getGanaPlayer(){
        return ganaPlayer;
    }

    public int getGanaComputer() {
        return ganaComputer;
    }

}