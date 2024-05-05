import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { copyToClipboard, openInNewTab } from "../../utils/browser-utils";
import { shareableMessaBody } from "../../constants";
import { callAnalytics } from "../../utils/amplitude-utils";

interface SharingOptionsProps {
  currentUrl: string;
  handleSuccessCopy: () => void;
  handleErrorCopy: () => void;
}

const SharingOptions = (props: SharingOptionsProps) => {
  const { currentUrl, handleSuccessCopy, handleErrorCopy } = props;

  const handleCopyOptionClick = async () => {
    const isCopied = await copyToClipboard(currentUrl);
    if (isCopied) {
      callAnalytics("share_icon_drawer_option_clicked", {
        option: "copy",
        staus: "success",
      });
      handleSuccessCopy();
    } else {
      callAnalytics("share_icon_drawer_option_clicked", {
        option: "copy",
        staus: "failed",
      });
      handleErrorCopy();
    }
  };

  const handleSmsOptionClick = () => {
    callAnalytics("share_icon_drawer_option_clicked", {
      option: "sms",
    });
    openInNewTab(`sms:?&body=${shareableMessaBody} ${currentUrl}`);
  };

  const handleWhatsappOptionClick = () => {
    callAnalytics("share_icon_drawer_option_clicked", {
      option: "whatsapp",
    });
    openInNewTab(
      `https://wa.me//send?text=${shareableMessaBody} ${currentUrl}`
    );
  };

  const SNS = [
    {
      name: "WhatsApp",
      handleOptionClick: handleWhatsappOptionClick,
    },
    {
      name: "SMS",
      handleOptionClick: handleSmsOptionClick,
    },
    {
      name: "Copy",
      handleOptionClick: handleCopyOptionClick,
    },
  ];

  return (
    <List>
      {SNS.map((sns) => (
        <Box key={sns.name}>
          <ListItem disablePadding onClick={sns.handleOptionClick}>
            <ListItemButton
              sx={{
                px: 0,
              }}
            >
              <ListItemText primary={sns.name} />
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                }}
              >
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </Box>
      ))}
    </List>
  );
};

export default SharingOptions;
