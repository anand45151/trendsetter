package com.example.trend.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.trend.ui.components.*
import com.example.trend.ui.theme.*

data class NotificationItem(
    val id: String,
    val type: NotifType,
    val user: String,
    val handle: String,
    val initials: String,
    val avatarColor: Long,
    val message: String,
    val time: String,
    val isRead: Boolean = false
)

enum class NotifType { LIKE, RETWEET, FOLLOW, MENTION, REPLY }

@Composable
fun NotificationsScreen(
    currentRoute: String,
    onNavigate: (String) -> Unit
) {
    val notifications = listOf(
        NotificationItem("n1", NotifType.LIKE, "NASA", "@nasa", "NA", 0xFF0B3D91, "liked your tweet about Android dev", "2m"),
        NotificationItem("n2", NotifType.FOLLOW, "Ava Chen", "@avachen_dev", "AC", 0xFFF91880, "started following you", "15m"),
        NotificationItem("n3", NotifType.RETWEET, "TechCrunch", "@techcrunch", "TC", 0xFF0CBEF3, "retweeted your tweet", "1h", isRead = true),
        NotificationItem("n4", NotifType.MENTION, "Jordan K.", "@jordankeys", "JK", 0xFF00BA7C, "mentioned you in a tweet", "2h", isRead = true),
        NotificationItem("n5", NotifType.REPLY, "Bloomberg", "@bloomberg", "BL", 0xFF1D9BF0, "replied to your tweet: Great analysis!", "4h", isRead = true),
        NotificationItem("n6", NotifType.LIKE, "Elon M.", "@elonm", "EM", 0xFF333333, "liked your tweet", "6h", isRead = true),
        NotificationItem("n7", NotifType.FOLLOW, "Ava Chen", "@avachen_dev", "AC", 0xFFF91880, "liked your media tweet", "1d", isRead = true),
    )

    Scaffold(
        containerColor = BackgroundPrimary,
        topBar = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(BackgroundPrimary)
            ) {
                Spacer(Modifier.statusBarsPadding())
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 10.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Notifications",
                        style = MaterialTheme.typography.headlineMedium,
                        color = TextPrimary,
                        fontWeight = FontWeight.Bold
                    )
                    Icon(
                        imageVector = Icons.Outlined.Tune,
                        contentDescription = "Filter",
                        tint = TextPrimary,
                        modifier = Modifier.size(22.dp)
                    )
                }
                HorizontalDivider(color = DividerColor, thickness = 0.5.dp)
            }
        },
        bottomBar = {
            TrendBottomBar(
                currentRoute = currentRoute,
                onNavigate = onNavigate
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            items(notifications) { notif ->
                NotificationRow(notif = notif)
            }

            item { Spacer(Modifier.height(16.dp)) }
        }
    }
}

@Composable
private fun NotificationRow(notif: NotificationItem) {
    val bgColor = if (!notif.isRead) TrendBlue.copy(alpha = 0.05f) else Color.Transparent
    val (icon, iconColor) = when (notif.type) {
        NotifType.LIKE -> Icons.Filled.Favorite to LikeRed
        NotifType.RETWEET -> Icons.Filled.Repeat to RetweetGreen
        NotifType.FOLLOW -> Icons.Filled.PersonAdd to TrendBlue
        NotifType.MENTION -> Icons.Filled.AlternateEmail to PurpleAccent
        NotifType.REPLY -> Icons.Filled.Reply to TrendBlue
    }

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(bgColor)
            .clickable { }
            .padding(horizontal = 16.dp, vertical = 14.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        // Notification icon
        Box(
            modifier = Modifier.width(44.dp),
            contentAlignment = Alignment.TopEnd
        ) {
            Icon(
                imageVector = icon,
                contentDescription = notif.type.name,
                tint = iconColor,
                modifier = Modifier.size(22.dp)
            )
        }

        Column(modifier = Modifier.weight(1f)) {
            // User avatar
            UserAvatar(
                initials = notif.initials,
                colorValue = notif.avatarColor,
                size = 40
            )

            Spacer(Modifier.height(8.dp))

            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = notif.user,
                    style = MaterialTheme.typography.titleSmall,
                    color = TextPrimary,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = notif.message,
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextPrimary
                )
            }

            Text(
                text = notif.time,
                style = MaterialTheme.typography.labelSmall,
                color = TextSecondary
            )
        }

        if (!notif.isRead) {
            Box(
                modifier = Modifier
                    .size(8.dp)
                    .clip(CircleShape)
                    .background(TrendBlue)
                    .align(Alignment.Top)
            )
        }
    }

    HorizontalDivider(color = DividerColor, thickness = 0.5.dp)
}
