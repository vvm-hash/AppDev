import 'package:flutter/material.dart';
import 'package:math_expressions/math_expressions.dart';

void main() {
runApp(CalculatorApp());
}

class CalculatorApp extends StatefulWidget {
@override
_CalculatorAppState createState() => _CalculatorAppState();
}

class _CalculatorAppState extends State<CalculatorApp> {
String equation = "0";
String result = "0";

buttonPressed(String buttonText) {
setState(() {
if (buttonText == "C") {
equation = "0";
result = "0";
} else if (buttonText == "⌫") {
equation = equation.length > 1
? equation.substring(0, equation.length - 1)
: "0";
} else if (buttonText == "=") {
try {
Parser p = Parser();
Expression exp = p.parse(equation.replaceAll('×', '*').replaceAll('÷', '/'));
ContextModel cm = ContextModel();
result = "${exp.evaluate(EvaluationType.REAL, cm)}";
} catch (e) {
result = "Error";
}
} else {
if (equation == "0") {
equation = buttonText;
} else {
equation += buttonText;
}
}
});
}

Widget buildButton(String buttonText, Color buttonColor) {
return Expanded(
child: ElevatedButton(
style: ElevatedButton.styleFrom(
backgroundColor: buttonColor,
padding: EdgeInsets.all(24),
),
onPressed: () => buttonPressed(buttonText),
child: Text(
buttonText,
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
title: Text("Calculator"),
backgroundColor: Colors.black,
),
body: Column(
children: <Widget>[
Container(
alignment: Alignment.centerRight,
padding: EdgeInsets.symmetric(vertical: 24, horizontal: 12),
child: Text(
equation,
style: TextStyle(color: Colors.white, fontSize: 32),
),
),
Container(
alignment: Alignment.centerRight,
padding: EdgeInsets.symmetric(vertical: 24, horizontal: 12),
child: Text(
result,
style: TextStyle(color: Colors.white, fontSize: 48),
),
),
Expanded(
child: Divider(),
),
Column(
children: [
Row(
children: [
buildButton("C", Colors.red),
buildButton("⌫", Colors.orange),
buildButton("÷", Colors.orange),
],
),
Row(
children: [
buildButton("7", Colors.grey[800]!),
buildButton("8", Colors.grey[800]!),
buildButton("9", Colors.grey[800]!),
buildButton("×", Colors.orange),
],
),
Row(
children: [
buildButton("4", Colors.grey[800]!),
buildButton("5", Colors.grey[800]!),
buildButton("6", Colors.grey[800]!),
buildButton("-", Colors.orange),
],
),
Row(
children: [
buildButton("1", Colors.grey[800]!),
buildButton("2", Colors.grey[800]!),
buildButton("3", Colors.grey[800]!),
buildButton("+", Colors.orange),
],
),
Row(
children: [
buildButton("0", Colors.grey[800]!),
buildButton(".", Colors.grey[800]!),
buildButton("=", Colors.green),
],
),
],
)
],
),
),
);
}
}
