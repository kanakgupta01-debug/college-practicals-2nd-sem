public class Main {

    public static void main(String[] args) {

        SavingsAccount sa =
                new SavingsAccount(101, "Kanak Gupta", 50000);

        CurrentAccount ca =
                new CurrentAccount(201, "Rahul Sharma", 80000);

        sa.deposit(5000);
        ca.deposit(10000);

        System.out.println("===== SAVINGS ACCOUNT =====");
        sa.displayDetails();
        System.out.println("Interest : ₹" + sa.calculateInterest());

        System.out.println();

        System.out.println("===== CURRENT ACCOUNT =====");
        ca.displayDetails();
        System.out.println("Interest : ₹" + ca.calculateInterest());
    }
}