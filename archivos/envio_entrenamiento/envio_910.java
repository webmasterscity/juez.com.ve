import java.util.Scanner;
 
public class envio_910 {
    public static void main(String[] args){
      int sum = 0, firstNumber, secondNumber;
      Scanner inputNumScanner = new Scanner(System.in);
      System.out.println("");
      firstNumber = inputNumScanner.nextInt();
 
      System.out.println("");
      secondNumber = inputNumScanner.nextInt();
 
      sum = firstNumber + secondNumber;
 
      System.out.println(sum);
    }
}
