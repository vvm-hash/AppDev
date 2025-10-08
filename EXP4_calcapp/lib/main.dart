import 'package:flutter/material.dart';

void main() {
  runApp(SimpleCalculator());
}

class SimpleCalculator extends StatefulWidget {
  @override
  _SimpleCalculatorState createState() => _SimpleCalculatorState();
}

class _SimpleCalculatorState extends State<SimpleCalculator> {
  String display = '';
  double num1 = 0;
  double num2 = 0;
  String operator = '';

  void buttonPressed(String value) {
    setState(() {
      if (value == 'C') {
        display = '';
        num1 = 0;
        num2 = 0;
        operator = '';
      } else if (value == '+' || value == '-' || value == '×' || value == '÷') {
        num1 = double.tryParse(display) ?? 0;
        operator = value;
        display = '';
      } else if (value == '=') {
        num2 = double.tryParse(display) ?? 0;
        switch (operator) {
          case '+':
            display = (num1 + num2).toString();
            break;
          case '-':
            display = (num1 - num2).toString();
            break;
          case '×':
            display = (num1 * num2).toString();
            break;
          case '÷':
            display = num2 != 0 ? (num1 / num2).toString() : 'Error';
            break;
        }
      } else {
        display += value;
      }
    });
  }

  Widget buildButton(String text, Color color) {
    return Expanded(
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: color,
          padding: EdgeInsets.all(20),
        ),
        onPressed: () => buttonPressed(text),
        child: Text(
          text,
          style: TextStyle(fontSize: 24, color: Colors.white),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: Colors.black,
        appBar: AppBar(
          title: Text('Simple Calculator'),
          backgroundColor: Colors.black,
        ),
        body: Column(
          children: [
            Expanded(
              child: Container(
                alignment: Alignment.bottomRight,
                padding: EdgeInsets.all(20),
                child: Text(
                  display,
                  style: TextStyle(fontSize: 48, color: Colors.white),
                ),
              ),
            ),
            Column(
              children: [
                Row(
                  children: [
                    buildButton('7', Colors.grey[800]!),
                    buildButton('8', Colors.grey[800]!),
                    buildButton('9', Colors.grey[800]!),
                    buildButton('÷', Colors.orange),
                  ],
                ),
                Row(
                  children: [
                    buildButton('4', Colors.grey[800]!),
                    buildButton('5', Colors.grey[800]!),
                    buildButton('6', Colors.grey[800]!),
                    buildButton('×', Colors.orange),
                  ],
                ),
                Row(
                  children: [
                    buildButton('1', Colors.grey[800]!),
                    buildButton('2', Colors.grey[800]!),
                    buildButton('3', Colors.grey[800]!),
                    buildButton('-', Colors.orange),
                  ],
                ),
                Row(
                  children: [
                    buildButton('C', Colors.red),
                    buildButton('0', Colors.grey[800]!),
                    buildButton('=', Colors.green),
                    buildButton('+', Colors.orange),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
