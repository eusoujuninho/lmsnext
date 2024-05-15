# Obtém o ID do processo que está usando a porta 3000
$processId = (Get-NetTCPConnection -LocalPort 3000).OwningProcess

# Mata o processo pelo ID
if ($processId) {
    Stop-Process -Id $processId -Force
    Write-Host "Processo(s) na porta 3000 foram encerrados."
} else {
    Write-Host "Nenhum processo encontrado na porta 3000."
}
