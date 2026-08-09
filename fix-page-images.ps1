$images = Get-ChildItem images -Name
$pages = Get-ChildItem pages\*.html
$slugMap = @{
    lion = 'su-tu.jpg'
}

foreach ($page in $pages) {
    $content = Get-Content $page.FullName -Raw
    if ($content -match '<img src="\.\./images/(?<file>[^"]+)" alt="') {
        $file = $Matches['file']
        $slug = [System.IO.Path]::GetFileNameWithoutExtension($file)
        $target = $null
        if ($slugMap.ContainsKey($slug)) {
            $target = $slugMap[$slug]
        } elseif ($images -contains "$slug.jpg") {
            $target = "$slug.jpg"
        } elseif ($images -contains "$slug.svg") {
            $target = "$slug.svg"
        }

        if ($target -and $target -ne $file) {
            $newContent = $content -replace [regex]::Escape("../images/$file"), "../images/$target"
            if ($newContent -ne $content) {
                Set-Content $page.FullName $newContent -Encoding UTF8
                Write-Output "Updated $($page.Name): $file -> $target"
            }
        }
    }
}
Write-Output "Done."
