<div class="panel">
  <h3>Redirecting to Midtrans</h3>
  <p>Mohon tunggu, kami sedang menyiapkan pembayaran.</p>
</div>
<script src="{if $env=='production'}https://app.midtrans.com/snap/snap.js{else}https://app.sandbox.midtrans.com/snap/snap.js{/if}" data-client-key="{$client_key|escape:'htmlall':'UTF-8'}"></script>
<script>
if ('{$snap_token|escape:'javascript':'UTF-8'}') {
  snap.pay('{$snap_token|escape:'javascript':'UTF-8'}');
}
</script>
