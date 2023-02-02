package juegos;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;


public class  Juego extends JFrame {

    private JButton btn_play;
    private JPanel PanelPrincipal;

    public Juego() {
        add(PanelPrincipal);
        setSize(1050,800);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        final juego1 juego11 =new juego1();
        btn_play.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
               juego11.setVisible(true);
                dispose();
            }
        });


    }


    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                Juego ingreso = new Juego();
                ingreso.setVisible(true);
            }
        });
    }
}