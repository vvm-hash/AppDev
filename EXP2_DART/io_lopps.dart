import 'dart:io';
void main() {
  stdout.write('Enter a positive integer: ');
  String? line = stdin.readLineSync();
  if (line == null || line.trim().isEmpty) {
    print('No input provided. Exiting.');
    return;
  }
  int? n = int.tryParse(line.trim());
  if (n == null || n <= 0) {
    print('Please enter a valid positive integer.');
    return;
  }
  // 1) for loop: print numbers 1..n
  print('\nNumbers from 1 to $n (for loop):');
  for (int i = 1; i <= n; i++) {
    stdout.write('$i ');
  }
  print('\n');
  // 2) while loop: sum numbers 1..n
  int sum = 0;
  int j = 1;
  while (j <= n) {
    sum += j;
    j++;
  }
  print('Sum of numbers 1 to $n (while loop): $sum');
  // 3) do-while loop: count digits of n (example do-while)
  int temp = n;
  int digits = 0;
  do {
    digits++;
    temp ~/= 10; // integer division
  } while (temp > 0);
  print('Number of digits in $n (do-while loop): $digits');
  // 4) for-in (iterable) demonstration: print multiples of n (first 5)
  print('\nFirst 5 multiples of $n (for-in simulated with List):');
  List<int> multiples = [1, 2, 3, 4, 5].map((m) => m * n).toList();
  for (var m in multiples) {
    print(m);
  }
}