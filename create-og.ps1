Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$bmp = New-Object System.Drawing.Bitmap($width, $height)
$graph = [System.Drawing.Graphics]::FromImage($bmp)

# Background
$graph.Clear([System.Drawing.Color]::FromArgb(255, 15, 23, 42))

# Text Brushes
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$blueBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 96, 165, 250))

# Fonts
$fontTitle = New-Object System.Drawing.Font("Arial", 72, [System.Drawing.FontStyle]::Bold)
$fontSub = New-Object System.Drawing.Font("Arial", 36, [System.Drawing.FontStyle]::Regular)
$fontDesc = New-Object System.Drawing.Font("Arial", 28, [System.Drawing.FontStyle]::Regular)

# Draw Text
$graph.DrawString("SLabs AI PDF", $fontTitle, $whiteBrush, 100, 180)
$graph.DrawString("PDF • Image • Form Tools", $fontSub, $blueBrush, 100, 320)
$graph.DrawString("Hindi-first PDF utility platform", $fontDesc, $whiteBrush, 100, 420)

$bmp.Save("F:\SLabs-AI-PDF-Website\public\og-default.png", [System.Drawing.Imaging.ImageFormat]::Png)

$graph.Dispose()
$bmp.Dispose()
$whiteBrush.Dispose()
$blueBrush.Dispose()
$fontTitle.Dispose()
$fontSub.Dispose()
$fontDesc.Dispose()
