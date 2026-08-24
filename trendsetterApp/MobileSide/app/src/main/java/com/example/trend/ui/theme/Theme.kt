package com.example.trend.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val TrendDarkColorScheme = darkColorScheme(
    primary = TrendBlue,
    onPrimary = Color.White,
    primaryContainer = Color(0xFF0A2D4D),
    onPrimaryContainer = TrendBlueLight,
    secondary = PurpleAccent,
    onSecondary = Color.White,
    secondaryContainer = Color(0xFF2D1B55),
    onSecondaryContainer = Color(0xFFCDB4FF),
    tertiary = LikeRed,
    onTertiary = Color.White,
    background = BackgroundPrimary,
    onBackground = TextPrimary,
    surface = SurfaceColor,
    onSurface = TextPrimary,
    surfaceVariant = SurfaceVariant,
    onSurfaceVariant = TextSecondary,
    outline = BorderColor,
    outlineVariant = DividerColor,
    error = BadgeRed,
    onError = Color.White,
)

@Composable
fun TrendTheme(
    darkTheme: Boolean = true, // Always dark for Twitter-like feel
    content: @Composable () -> Unit
) {
    val colorScheme = TrendDarkColorScheme

    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = BackgroundPrimary.toArgb()
            window.navigationBarColor = BackgroundPrimary.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = false
            WindowCompat.getInsetsController(window, view).isAppearanceLightNavigationBars = false
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = TrendTypography,
        content = content
    )
}