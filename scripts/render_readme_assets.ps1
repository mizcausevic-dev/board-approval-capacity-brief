$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Board Approval Capacity Brief", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic scenario render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ScenarioImage -Title "Board-ready overview for approval capacity" -Subtitle "One executive brief for reviewer bandwidth, queue pressure, committee load, escalation coverage, and board confidence." -Bullets @(
  "The overview keeps constrained lanes, staffing moves, and unresolved approval bottlenecks visible in one committee-safe surface.",
  "Leadership can see where hiring, reallocation, escalation, or queue holds would recover board-safe decision speed.",
  "This layer turns scattered approval bottlenecks into one board-ready staffing packet instead of another manual synthesis cycle."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ScenarioImage -Title "Capacity lane keeps owner, audience, staffing theme, and next move connected" -Subtitle "Every route retains the owner, audience, staffing action, capacity theme, reviewer counts, and board confidence." -Bullets @(
  "The capacity-lane view makes it obvious which systems are slowing because of reviewer strain and which ones need staffing intervention before another board meeting.",
  "Board questions stay attached to actual capacity themes instead of vague operating language.",
  "Leadership can tighten the staffing packet before the next board, investor, or operating review begins."
) -OutputPath (Join-Path $screenshots "02-capacity-lane-proof.png")

New-ScenarioImage -Title "Staffing ledger shows where the board cannot ignore approval bottlenecks" -Subtitle "Capacity headlines, backlog signals, escalation owners, reviewer counts, and required evidence stay visible in one board readout." -Bullets @(
  "This view keeps revenue, identity, biotech, and FinTech lanes tied to the specific staffing bottlenecks slowing real decisions.",
  "Thin reviewer coverage stays visible before it turns into another memo or investor narrative that outruns actual operating motion.",
  "Leadership can see exactly where one tighter staffing intervention would strengthen the next board discussion."
) -OutputPath (Join-Path $screenshots "03-staffing-ledger-proof.png")

New-ScenarioImage -Title "Intervention posture keeps action, severity, and staffing exposure tied together" -Subtitle "Composite capacity risk, severity signals, and board-safe action stay grounded in the same operating view." -Bullets @(
  "The intervention-posture view keeps the next board move attached to actual reviewer and committee strain instead of abstract process stories.",
  "Weak board confidence remains visible before leadership assumes the approval machine can absorb more scope.",
  "This creates a repeatable packet that can travel into board, diligence, and operating reviews."
) -OutputPath (Join-Path $screenshots "04-intervention-posture-proof.png")
