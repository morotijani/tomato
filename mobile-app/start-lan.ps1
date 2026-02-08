$ip = "192.168.0.122"
$env:REACT_NATIVE_PACKAGER_HOSTNAME = $ip
Write-Host "Setting REACT_NATIVE_PACKAGER_HOSTNAME to $ip"
npx expo start --lan --clear
