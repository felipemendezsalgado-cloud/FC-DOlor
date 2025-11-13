param(
  [int]$Port = 8000,
  [string]$Root = "."
)

Add-Type -AssemblyName System.Net
Add-Type -AssemblyName System.IO

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
  Write-Host "Static server running at $prefix serving '$Root'"

  while ($true) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $localPath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($localPath)) { $localPath = 'index.html' }

    $filePath = Join-Path (Resolve-Path $Root) $localPath
    if (Test-Path $filePath) {
      if ((Get-Item $filePath).PSIsContainer) {
        $filePath = Join-Path $filePath 'index.html'
      }
    }

    if (-not (Test-Path $filePath)) {
      $response.StatusCode = 404
      $bytes = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
      $response.Close()
      continue
    }

    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
    $contentType = switch ($ext) {
      '.html' { 'text/html' }
      '.css'  { 'text/css' }
      '.js'   { 'application/javascript' }
      '.png'  { 'image/png' }
      '.jpg'  { 'image/jpeg' }
      '.jpeg' { 'image/jpeg' }
      '.svg'  { 'image/svg+xml' }
      '.pdf'  { 'application/pdf' }
      default { 'application/octet-stream' }
    }

    try {
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $response.ContentType = $contentType
      $response.ContentLength64 = $bytes.Length
      $response.StatusCode = 200
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    catch {
      $response.StatusCode = 500
      $err = [System.Text.Encoding]::UTF8.GetBytes("Server Error")
      $response.OutputStream.Write($err, 0, $err.Length)
    }
    finally {
      $response.Close()
    }
  }
}
finally {
  if ($listener.IsListening) { $listener.Stop() }
  $listener.Close()
}