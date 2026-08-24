package com.example.trend.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.trend.data.SampleData
import com.example.trend.data.TrendingTopic
import com.example.trend.ui.components.*
import com.example.trend.ui.theme.*

@Composable
fun TrendingScreen(
    currentRoute: String,
    onNavigate: (String) -> Unit
) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf("All") }
    val categories = listOf("All", "Tech", "Sports", "Entertainment", "Politics", "Finance")

    Scaffold(
        containerColor = BackgroundPrimary,
        topBar = {
            TrendingTopBar(
                searchQuery = searchQuery,
                onSearchChange = { searchQuery = it }
            )
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
            // Category filter chips
            item {
                CategoryChips(
                    categories = categories,
                    selected = selectedCategory,
                    onSelect = { selectedCategory = it }
                )
            }

            // Section header
            item {
                SectionHeader("Trends for you")
            }

            // Trending topics
            val filtered = if (selectedCategory == "All") {
                SampleData.trendingTopics
            } else {
                SampleData.trendingTopics.filter { it.category.contains(selectedCategory, ignoreCase = true) }
            }

            items(filtered) { topic ->
                TrendingTopicRow(topic = topic)
            }

            // What's happening section
            item {
                SectionHeader("What's happening")
            }

            items(SampleData.tweets.take(3)) { tweet ->
                TweetCard(
                    tweet = tweet,
                    onLike = { },
                    onRetweet = { },
                    onReply = { },
                    onBookmark = { }
                )
            }

            item { Spacer(Modifier.height(16.dp)) }
        }
    }
}

@Composable
private fun TrendingTopBar(
    searchQuery: String,
    onSearchChange: (String) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(BackgroundPrimary)
    ) {
        Spacer(modifier = Modifier.statusBarsPadding())

        // Search bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 10.dp)
                .clip(RoundedCornerShape(24.dp))
                .background(SurfaceVariant)
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Icon(
                imageVector = Icons.Filled.Search,
                contentDescription = "Search",
                tint = TextSecondary,
                modifier = Modifier.size(20.dp)
            )
            BasicTextField(
                value = searchQuery,
                onValueChange = onSearchChange,
                modifier = Modifier.weight(1f),
                textStyle = MaterialTheme.typography.bodyLarge.copy(color = TextPrimary),
                singleLine = true,
                cursorBrush = SolidColor(TrendBlue),
                decorationBox = { inner ->
                    if (searchQuery.isEmpty()) {
                        Text(
                            text = "Search Twitter",
                            style = MaterialTheme.typography.bodyLarge,
                            color = TextTertiary
                        )
                    }
                    inner()
                }
            )
            if (searchQuery.isNotEmpty()) {
                Icon(
                    imageVector = Icons.Filled.Clear,
                    contentDescription = "Clear",
                    tint = TrendBlue,
                    modifier = Modifier
                        .size(18.dp)
                        .clickable { onSearchChange("") }
                )
            }
        }

        HorizontalDivider(color = DividerColor, thickness = 0.5.dp)
    }
}

@Composable
private fun CategoryChips(
    categories: List<String>,
    selected: String,
    onSelect: (String) -> Unit
) {
    androidx.compose.foundation.lazy.LazyRow(
        contentPadding = PaddingValues(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier
            .fillMaxWidth()
            .background(BackgroundPrimary)
    ) {
        items(categories) { cat ->
            val isSelected = cat == selected
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(20.dp))
                    .then(
                        if (isSelected) Modifier.background(
                            brush = Brush.horizontalGradient(
                                colors = listOf(TrendBlue, PurpleAccent)
                            )
                        ) else Modifier.background(SurfaceVariant)
                    )
                    .clickable { onSelect(cat) }
                    .padding(horizontal = 16.dp, vertical = 8.dp)
            ) {
                Text(
                    text = cat,
                    style = MaterialTheme.typography.labelLarge,
                    color = if (isSelected) Color.White else TextSecondary,
                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                )
            }
        }
    }

    HorizontalDivider(color = DividerColor, thickness = 0.5.dp)
}

@Composable
private fun TrendingTopicRow(topic: TrendingTopic) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { }
            .padding(horizontal = 16.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Column(modifier = Modifier.weight(1f)) {
            // Category + promoted
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Text(
                    text = "${topic.category} · Trending",
                    style = MaterialTheme.typography.labelSmall,
                    color = TextSecondary
                )
                if (topic.isPromoted) {
                    Text(
                        text = "· Promoted",
                        style = MaterialTheme.typography.labelSmall,
                        color = TrendBlue
                    )
                }
            }

            Spacer(modifier = Modifier.height(2.dp))

            // Hashtag
            Text(
                text = topic.hashtag,
                style = MaterialTheme.typography.titleMedium,
                color = TextPrimary,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(2.dp))

            // Tweet count
            Text(
                text = topic.tweetCount,
                style = MaterialTheme.typography.labelSmall,
                color = TextSecondary
            )
        }

        // Rank badge or icon
        Box(
            modifier = Modifier
                .size(36.dp)
                .clip(RoundedCornerShape(8.dp))
                .background(SurfaceVariant),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "#${topic.rank}",
                style = MaterialTheme.typography.labelMedium,
                color = TrendBlue,
                fontWeight = FontWeight.Bold
            )
        }
    }

    HorizontalDivider(color = DividerColor, thickness = 0.5.dp)
}
