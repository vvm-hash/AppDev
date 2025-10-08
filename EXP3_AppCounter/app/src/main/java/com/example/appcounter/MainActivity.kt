package com.example.appcounter

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private var counter = 0  // variable to keep track of count

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val tvCounter = findViewById<TextView>(R.id.tvCounter)
        val btnIncrement = findViewById<Button>(R.id.btnIncrement)
        val btnDecrement = findViewById<Button>(R.id.btnDecrement)
        val btnReset = findViewById<Button>(R.id.btnReset)

        // Increment button
        btnIncrement.setOnClickListener {
            counter++
            tvCounter.text = counter.toString()
        }

        // Decrement button
        btnDecrement.setOnClickListener {
            if (counter > 0) counter--  // prevent going negative
            tvCounter.text = counter.toString()
        }

        // Reset button
        btnReset.setOnClickListener {
            counter = 0
            tvCounter.text = counter.toString()
        }
    }
}
