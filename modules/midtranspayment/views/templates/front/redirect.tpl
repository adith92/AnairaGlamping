<div class="panel">
  <h3>Redirecting to Midtrans</h3>
  {if $safe_error}
    <p>{$safe_error|escape:'htmlall':'UTF-8'}</p>
    <p><a href="https://wa.me/6281399693499?text=Saya%20ingin%20booking%20Anaira%20Glamping">Book via WhatsApp</a></p>
  {else}
    <p>Mohon tunggu, kami sedang menyiapkan pembayaran.</p>
  {/if}
</div>
{if !$safe_error}
<script src="{if $env=='production'}https://app.midtrans.com/snap/snap.js{else}https://app.sandbox.midtrans.com/snap/snap.js{/if}" data-client-key="{$client_key|escape:'htmlall':'UTF-8'}"></script>
<script>if ('{$snap_token|escape:'javascript':'UTF-8'}') { snap.pay('{$snap_token|escape:'javascript':'UTF-8'}'); }</script>
{/if}
