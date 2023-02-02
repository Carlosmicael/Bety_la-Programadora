package juegos;

import Main.Metodo;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class juego1 extends JFrame {

    private JButton piedra;
    private JButton papel;
    private JButton tijera;
    private JPanel PanelPrincipal1;
    private JLabel whoWin;
    private JLabel Computer;
    private JLabel Player;
    private JTextField scorePlayer;
    private JTextField scoreComputer;
    private JLabel resImage;
    private final Metodo m = new Metodo();
    public juego1() {
        add(PanelPrincipal1);
        setSize(1050,800);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        piedra.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int valorMaquina = m.turnoMaquina();
                Player.setIcon(m.traductorTurnero(0));
                Player.repaint();
                Computer.setIcon(m.traductorTurnero(valorMaquina));
                Computer.repaint();
                String Ganador = m.versus(0, valorMaquina);
                whoWin.setText(Ganador);
                m.contador_de_Victorias(Ganador);
                scoreComputer.setText(Integer.toString(m.getGanaComputer()));
                scorePlayer.setText(Integer.toString(m.getGanaPlayer()));


            }
        });
        papel.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int valorMaquina = m.turnoMaquina();
                Player.setIcon(m.traductorTurnero(1));
                Player.repaint();
                Computer.setIcon(m.traductorTurnero(valorMaquina));
                Computer.repaint();
                String Ganador = m.versus(1, valorMaquina);
                whoWin.setText(Ganador);
                m.contador_de_Victorias(Ganador);
                scoreComputer.setText(Integer.toString(m.getGanaComputer()));
                scorePlayer.setText(Integer.toString(m.getGanaPlayer()));
            }
        });
        tijera.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int valorMaquina = m.turnoMaquina();
                Player.setIcon(m.traductorTurnero(2));
                Player.repaint();
                Computer.setIcon(m.traductorTurnero(valorMaquina));
                Computer.repaint();
                String Ganador = m.versus(2, valorMaquina);
                whoWin.setText(Ganador);
                m.contador_de_Victorias(Ganador);
                scoreComputer.setText(Integer.toString(m.getGanaComputer()));
                scorePlayer.setText(Integer.toString(m.getGanaPlayer()));
            }
        });

    }
    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                juego1 ingreso = new juego1();
                ingreso.setVisible(true);
            }
        });
    }
}