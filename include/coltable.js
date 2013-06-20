function toggle_visibility_details(tbid)
{
  if (document.all)
  {
    document.getElementById(tbid).style.display = document.getElementById(tbid).style.display == "block" ? "none" : "block";
    toggle_visibility_benign(tbid);
  }
  else
  {
    document.getElementById(tbid).style.display = document.getElementById(tbid).style.display == "table" ? "none" : "table";
    toggle_visibility_benign(tbid);
  }
  document.getElementById("lnk_" + tbid).value = document.getElementById("lnk_" + tbid).value == "[-] show less" ? "[+] show more" : "[-] show less";
}

function toggle_visibility_benign(tbid)
{
  if(document.getElementById(tbid).style.display != "none")
  {
    var checked = document.getElementById("chk_" + tbid).checked;
    var benigns = document.getElementsByName("benign_" + tbid);

    if (checked)
    {
      for (var i = 0; i < benigns.length; i++)
        benigns[i].style.display = "none";
    }
    else
    {
      for (var i = 0; i < benigns.length; i++)
        benigns[i].style.display = "";
    }
  }
}
