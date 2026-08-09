$pagesDir = Join-Path $PSScriptRoot "..\pages"
$outFile = Join-Path $PSScriptRoot "..\data\animals.json"
$animals = @()

Get-ChildItem -Path $pagesDir -Filter "*.html" | ForEach-Object {
    $html = Get-Content $_.FullName -Raw -Encoding UTF8
    $slug = $_.BaseName

    function Get-Field($id) {
        if ($html -match "id=`"$id`">([^<]*)") { return $Matches[1].Trim() }
        return ""
    }

    $image = "images/$slug.jpg"
    if ($html -match 'id="animalImage"[^>]*src="([^"]+)"') {
        $image = $Matches[1] -replace '^\.\./', ''
    }

    $name = Get-Field "animalName"
    if (-not $name -and $html -match '<h1>([^<]+)</h1>') {
        $name = $Matches[1].Trim()
    }

    $animals += [ordered]@{
        slug = $slug
        name = $name
        scientificName = Get-Field "animalScientificName"
        type = Get-Field "animalGroup"
        image = $image
        weight = Get-Field "animalWeight"
        length = Get-Field "animalLength"
        lifespan = Get-Field "animalLifespan"
        speed = Get-Field "animalSpeed"
        diet = Get-Field "animalDiet"
        distribution = Get-Field "animalDistribution"
        intro = Get-Field "animalIntro"
        habitat = Get-Field "animalHabitat"
        feeding = Get-Field "animalFeeding"
        distributionDetail = Get-Field "animalDistributionDetail"
    }
}

$sorted = $animals | Sort-Object { $_.name }
$sorted | ConvertTo-Json -Depth 5 | Set-Content -Path $outFile -Encoding UTF8

$jsFile = Join-Path $PSScriptRoot "..\data\animals.js"
$jsLines = @(
    "const animals = " + ($sorted | ConvertTo-Json -Depth 5 -Compress) + ";",
    "",
    "export default animals;"
)
$jsLines | Set-Content -Path $jsFile -Encoding UTF8

Write-Host "Wrote $($sorted.Count) animals to $outFile and $jsFile"
