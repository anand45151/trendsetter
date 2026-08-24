package com.example.trend

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.example.trend.ui.screens.*
import com.example.trend.ui.theme.BackgroundPrimary
import com.example.trend.ui.theme.TrendTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            TrendTheme {
                TrendApp()
            }
        }
    }
}

@Composable
fun TrendApp() {
    var currentScreen by remember { mutableStateOf("splash") }
    var previousScreen by remember { mutableStateOf("splash") }

    val navigate: (String) -> Unit = { route ->
        previousScreen = currentScreen
        currentScreen = route
    }

    AnimatedContent(
        targetState = currentScreen,
        transitionSpec = {
            when {
                targetState == "splash" -> {
                    fadeIn(tween(300)) togetherWith fadeOut(tween(300))
                }
                previousState == "splash" -> {
                    fadeIn(tween(400)) togetherWith fadeOut(tween(300))
                }
                else -> {
                    fadeIn(tween(200)) togetherWith fadeOut(tween(150))
                }
            }
        },
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundPrimary),
        label = "ScreenTransition"
    ) { screen ->
        when (screen) {
            "splash" -> {
                SplashScreen(
                    onSplashComplete = { navigate("home") }
                )
            }
            "home" -> {
                HomeScreen(
                    currentRoute = "home",
                    onNavigate = navigate
                )
            }
            "trending" -> {
                TrendingScreen(
                    currentRoute = "trending",
                    onNavigate = navigate
                )
            }
            "notifications" -> {
                NotificationsScreen(
                    currentRoute = "notifications",
                    onNavigate = navigate
                )
            }
            "profile" -> {
                ProfileScreen(
                    currentRoute = "profile",
                    onNavigate = navigate
                )
            }
        }
    }
}